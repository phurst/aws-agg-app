import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  SensorReading: a
    .model({
      sensorGroup: a.integer(),
      sensorNumber: a.integer(),
      time: a.datetime(),
      value: a.float(),
    })
    .authorization((allow) => [allow.owner()]),

  AggReading: a.customType({
    id: a.id().required(),
    sensorGroup: a.integer(),
    sensorNumber: a.integer(),
    time: a.datetime(),
    valueType: a.integer(),
    value: a.float(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
