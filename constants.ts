
import { LSCTopicItem } from './types';
import { BeakerIcon, FireIcon, ShieldCheckIcon, LightBulbIcon, ExclamationTriangleIcon, ClipboardDocumentListIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Example icons

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const INITIAL_LSC_TOPICS: LSCTopicItem[] = [
  {
    id: 'means-of-egress',
    title: 'Means of Egress',
    shortDescription: 'Requirements for safe exit routes, including corridors, doors, and stairs.',
    icon: ShieldCheckIcon,
  },
  {
    id: 'fire-alarm-systems',
    title: 'Fire Alarm Systems',
    shortDescription: 'Detection, notification, and monitoring of fire alarm systems.',
    icon: FireIcon,
  },
  {
    id: 'sprinkler-systems',
    title: 'Sprinkler Systems',
    shortDescription: 'Installation, maintenance, and testing of automatic sprinkler systems.',
    icon: BeakerIcon, // Placeholder, could be a water drop icon
  },
  {
    id: 'hazardous-areas',
    title: 'Hazardous Areas',
    shortDescription: 'Protection requirements for areas with high fire risk.',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    shortDescription: 'Ensuring illumination for egress paths during power outages.',
    icon: LightBulbIcon,
  },
  {
    id: 'fire-drills',
    title: 'Fire Drills & Staff Training',
    shortDescription: 'Conducting fire drills and ensuring staff are trained for emergencies.',
    icon: UserGroupIcon,
  },
  {
    id: 'smoking-regulations',
    title: 'Smoking Regulations',
    shortDescription: 'Policies and safety measures related to smoking in healthcare facilities.',
    icon: ClipboardDocumentListIcon, // Placeholder, could be a no-smoking icon
  },
];
