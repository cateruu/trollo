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
  title: string;
  color: string;
}
