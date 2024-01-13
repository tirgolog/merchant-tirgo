
import { AuthMockApi } from './common/auth/api';
import { MessagesMockApi } from './common/messages/api';
import { NavigationMockApi } from './common/navigation/api';
import { NotificationsMockApi } from './common/notifications/api';
import { UserMockApi } from './common/user/api';
import { IconsMockApi } from './ui/icons/api';

export const mockApiServices = [
    AuthMockApi,
    MessagesMockApi,
    IconsMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    UserMockApi,
];
