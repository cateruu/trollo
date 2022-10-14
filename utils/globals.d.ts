interface Project {
  id: string;
  creator_uid: string;
  creator_email: string;
  title: string;
  description: string;
  timestamp: string;
  color: string;
  shared_with: string[];
}

interface Card {
  id: string;
  data: CardData;
  tasks: Task[];
}

interface CardData {
  title: string;
  color: string;
  timestamp: Date;
  order: number;
}

interface Task {
  id: string;
  data: TaskData;
}

interface TaskData {
  card: string;
  task: string;
  priority: string;
  timestamp: Date;
}
