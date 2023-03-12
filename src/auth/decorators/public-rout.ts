import { SetMetadata } from '@nestjs/common';

export const PublicRout = () => SetMetadata('PUBLIC_ROUTE', true);
