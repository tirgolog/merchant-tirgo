import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    defaultNavigation: FuseNavigationItem[] = [
        {
            id: 'dashboards',
            title: 'Dashboards',
            type: 'group',
        
            children: [
                {
                    id: 'dashboards.project',
                    title: 'Project',
                    type: 'basic',
                    icon: 'admin.svg',
                    link: '/dashboards',
                },
                {
                    id: 'apps.help-center',
                    title: 'Help Center',
                    type: 'collapsable',
                    icon: 'heroicons_outline:information-circle',
                    link: '/apps/help-center',
                    children: [
                        {
                            id: 'apps.help-center.home',
                            title: 'Home',
                            type: 'basic',
                            link: '/apps/help-center',
                            exactMatch: true,
                        },
                        {
                            id: 'apps.help-center.faqs',
                            title: 'FAQs',
                            type: 'basic',
                            link: '/apps/help-center/faqs',
                        },
                        {
                            id: 'apps.help-center.guides',
                            title: 'Guides',
                            type: 'basic',
                            link: '/apps/help-center/guides',
                        },
                        {
                            id: 'apps.help-center.support',
                            title: 'Support',
                            type: 'basic',
                            link: '/apps/help-center/support',
                        },
                    ],
                },
            ],
        }
    ];
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) =>
            {
                this._navigation.next(navigation);
            }),
        );
    }
}
