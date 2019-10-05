import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { buildSchema } from 'type-graphql'

export class GraphqlConfigService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {
        const schema = await buildSchema({
            resolvers: [__dirname, '../**/*.resolver.ts'],
            dateScalarMode: 'isoDate',
            validate: false
        })

        return {
            schema,
            debug: true,
            playground: process.env.NODE_ENV !== 'production'
        }
    }
}