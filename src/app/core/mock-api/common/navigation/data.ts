/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        children: [
            {
                id: 'dashboards',
                title: 'control_panel',
                type: 'basic',
                icon: 'dashboard.svg',
                link: '/dashboards',
            },
            {
                id: 'admins',
                title: 'adminstration',
                type: 'basic',
                icon: 'people.svg',
                link: '/admins',
            },
            {
                id: 'role',
                title: 'secure_transaction',
                type: 'basic',
                icon: 'role.svg',
                link: '/secure-transaction',
            },
            {
                id: 'clients',
                title: 'clients',
                type: 'basic',
                icon: 'clients.svg',
                link: '/clients',
            },
            {
                id: 'drivers',
                title: 'drivers',
                type: 'basic',
                icon: 'drivers.svg',
                link: '/drivers',
            },
            {
                id: 'archived-clients',
                title: 'archived_users',
                type: 'basic',
                icon: 'clients.svg',
                link: '/archived-clients',
            },
            {
                id: 'orders',
                title: 'orders',
                type: 'basic',
                icon: 'file.svg',
                link: '/orders',
            },
            {
                id: 'tracking',
                title: 'tracking',
                type: 'basic',
                icon: 'tracking.svg',
                link: '/tracking',
            },
            {
                id: 'types',
                title: 'directories',
                type: 'collapsable',
                icon: 'list.svg',
                link: '/types/role',
                children: [
                    {
                        id: 'types.role',
                        title: 'user_roles',
                        type: 'basic',
                        link: '/types/role',
                        exactMatch: true,
                    },
                    {
                        id: 'types.subcription',
                        title: 'subscription_types',
                        type: 'basic',
                        link: '/types/subcription',
                        exactMatch: true,
                    },
                    {
                        id: 'types.car',
                        title: 'transport',
                        type: 'basic',
                        link: '/types/car',
                    },
                    {
                        id: 'types.active-user',
                        title: 'user_activity',
                        type: 'basic',
                        link: '/types/active-user',
                    },
                ],
            },
            {
                id: 'chats',
                title: 'chat',
                type: 'basic',
                icon: 'chat.svg',
                link: '/chats',
            },
            {
                id: 'active',
                title: 'activity',
                type: 'basic',
                icon: 'computer.svg',
                link: '/active',
            },
            {
                id: 'verification',
                title: 'verification',
                type: 'basic',
                icon: 'verify.svg',
                link: '/verification',
            },
            {
                id: 'agents',
                title: 'agents',
                type: 'basic',
                icon: 'people.svg',
                link: '/agents',
            }
        ],
    }
];

