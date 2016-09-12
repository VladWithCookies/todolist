projects = Project.create!([
  { title: 'Home', user_id: 1 },
  { title: 'Work', user_id: 1 }
])

tasks = Task.create!([
  { title: 'Buy milk', project_id: projects.first.id },
  { title: 'Walk dog', project_id: projects.first.id }
])