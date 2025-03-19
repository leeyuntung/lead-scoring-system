import { Circle, Mail, Phone, User } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "qualification",
      lead: "Sarah Johnson",
      description: "Lead qualified by AI with score 92",
      time: "2 hours ago",
      icon: User,
    },
    {
      id: 2,
      type: "outreach",
      lead: "Michael Chen",
      description: "Automated LinkedIn message sent",
      time: "3 hours ago",
      icon: Mail,
    },
    {
      id: 3,
      type: "response",
      lead: "David Rodriguez",
      description: "Responded to outreach message",
      time: "5 hours ago",
      icon: Phone,
    },
    {
      id: 4,
      type: "qualification",
      lead: "Emma Thompson",
      description: "Lead qualified by AI with score 95",
      time: "1 day ago",
      icon: User,
    },
    {
      id: 5,
      type: "data",
      lead: "System",
      description: "New leads collected from LinkedIn",
      time: "1 day ago",
      icon: Circle,
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{activity.lead}</span>
            <span className="text-sm text-muted-foreground">{activity.description}</span>
            <span className="text-xs text-muted-foreground">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

