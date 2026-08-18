const tasks = [
  { id: 1, title: "Plan the day", completed: true },
  { id: 2, title: "Review project notes", completed: false },
  { id: 3, title: "Take a short break", completed: false },
]

export function GET() {
  return Response.json({ tasks })
}
