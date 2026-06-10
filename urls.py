from django.urls import path
from .views import (
    TaskListView, 
    CreateDependencyView,
    UpdateTaskStatusView
)

urlpatterns = [
    path("tasks/", TaskListView.as_view(), name="task-list"),

    path(
        "tasks/<int:task_id>/dependencies/",
        CreateDependencyView.as_view(),
        name="create-dependency"
    ),
     path(
        "tasks/<int:task_id>/",
        UpdateTaskStatusView.as_view(),
        name="update-task-status"
    ),
    
]