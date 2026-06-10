from rest_framework import serializers
from .models import Task, TaskDependency

class TaskSerializer(serializers.ModelSerializer):

    dependency_titles = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
            "dependency_titles",
        ]

    def get_dependency_titles(self, obj):
        dependencies = TaskDependency.objects.filter(task=obj)
        return [dependency.depends_on.title for dependency in dependencies]

