import { registerEnumType } from 'type-graphql';

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
});
