interface Project {
  id: string;
  creator_uid: string;
  title: string;
  description: string;
  timestamp: string;
  color: string;
  shared_with?: string[];
}
