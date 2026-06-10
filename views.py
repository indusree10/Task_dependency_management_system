from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .models import TaskDependency
from .serializers import TaskSerializer

class TaskListView(APIView):

    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    


# Create your views here.
# import API view

# import Response

# import Task model

# import TaskSerializer

# create view
# DFS cycle detection function
def check_cycle(current_task,target_task,visited):
    if current_task == target_task:
        return True
    visited.add(current_task)
    dependencies = TaskDependency.objects.filter(task=current_task)
    for dependency in dependencies:
        if dependency.depends_on not in visited:
            if check_cycle(
                dependency.depends_on,
                target_task,
                visited
            ):
                return True
    return False
class CreateDependencyView(APIView):
    def post(self,request,task_id):
        depends_on_id = request.data.get("depends_on")
        task = Task.objects.get(id=task_id)
        depends_on_task = Task.objects.get(id=depends_on_id)
        if check_cycle(
           depends_on_task,
           task,
           set()
        ):
            return Response(
               {"error": "Circular dependency detected"},
               status = 400
        )
        dependency = TaskDependency.objects.create(
             task=task,
             depends_on=depends_on_task
        )

        return Response(
            {"message": "Dependency created successfully"}
        )
class UpdateTaskStatusView(APIView):

    def patch(self, request, task_id):
        task = Task.objects.get(id=task_id)
        new_status = request.data.get("status")
        task.status = new_status
        task.save()
        dependent_tasks = TaskDependency.objects.filter(
        depends_on=task
        )

        for dependency in dependent_tasks:
          update_task_status(dependency.task)
        return Response(
           {"message": "Task status updated sucessfully"}
         )
    def delete(self, request, task_id):
        task = Task.objects.get(id=task_id)
        task.delete()

        return Response(
           {"message": "Task deleted successfully"},
           status=204
    )
    
    
def update_task_status(task):

    dependencies = TaskDependency.objects.filter(task=task)

    all_completed = True
    has_blocked = False

    for dependency in dependencies:

        if dependency.depends_on.status == "blocked":
            has_blocked = True

        if dependency.depends_on.status != "completed":
            all_completed = False

    if has_blocked:
        task.status = "blocked"

    elif all_completed:
        task.status = "in_progress"

    else:
        task.status = "pending"

    task.save()