import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { ErrorInterceptorService } from './error-interceptor';
import { OfflineInterceptor } from './offline-interceptor';
import { RetryInterceptor } from './retry-interceptor';

export const provideInitialize = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(ErrorInterceptorService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OfflineInterceptor),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(RetryInterceptor),
            multi   : true,
        },
    ];
};
