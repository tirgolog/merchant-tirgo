import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';

import { forkJoin } from 'rxjs';
import { MessagesService } from './shared/components/common/messages/messages.service';
import { NotificationsService } from './shared/components/common/notifications/notifications.service';

export const initialDataResolver = () =>
{
    const messagesService = inject(MessagesService);
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        messagesService.getAll(),
        notificationsService.getAll(),
    ]);
};
