import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface JobOffer {
  title: string;
  tags: string[];
}

export interface ValueCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}
