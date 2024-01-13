import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { defaultNavigation } from 'app/core/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NavigationMockApi {
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {
                return [
                    200,
                    {
                        default: cloneDeep(this._defaultNavigation),
                    },
                ];
            });
    }
}
