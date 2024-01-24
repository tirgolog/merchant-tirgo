import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideFuse } from '@fuse';
import { appRoutes } from 'app/app.routes';
import { provideAuth } from 'app/modules/auth/auth.provider';
import { provideIcons } from 'app/core/icons/icons.provider';
import { provideTransloco } from 'app/core/transloco/transloco.provider';
import { mockApiServices } from './core/mock-api';
import { provideToastr } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/services/user/user.service';
import { provideInitialize } from './shared/interceptors/initialize.provider';
import { ErrorInterceptorService } from './shared/interceptors/error-interceptor';
import { OfflineInterceptor } from './shared/interceptors/offline-interceptor';
import { RetryInterceptor } from './shared/interceptors/retry-interceptor';
import { provideNgxMask } from 'ngx-mask';
import { AuthService } from './modules/auth/auth.service';
import { AlertService } from './shared/services/alert.service';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
    providers: [
        RetryInterceptor,
        OfflineInterceptor,
        ErrorInterceptorService,
        UserService,
        AlertService,
        ReactiveFormsModule,
        provideAnimations(),
        provideHttpClient(),
        provideInitialize(),
        provideNgxMask(),
        provideToastr({
            timeOut: 10000,
            closeButton: true,
            progressBar: true,
        }),
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
        ),
        {
            provide : DateAdapter,
            useClass: LuxonDateAdapter,
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D',
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },

        provideTransloco(),
        provideAuth(),
        provideIcons(),
        provideFuse({
            mockApi: {
                delay   : 0,
                services: mockApiServices,
            },
            fuse   : {
                layout : 'classy',
                scheme : 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme  : 'theme-default',
                themes : [
                    {
                        id  : 'theme-default',
                        name: 'Default',
                    },
                    {
                        id  : 'theme-brand',
                        name: 'Brand',
                    },
                    {
                        id  : 'theme-teal',
                        name: 'Teal',
                    },
                    {
                        id  : 'theme-rose',
                        name: 'Rose',
                    },
                    {
                        id  : 'theme-purple',
                        name: 'Purple',
                    },
                    {
                        id  : 'theme-amber',
                        name: 'Amber',
                    },
                ],
            },
        }),
    ],
};
