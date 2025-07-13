import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Note: a
    .model({
      name: a.string(),
      description: a.string(),
      image: a.string(),
      value: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  SensorReading: a
    .model({
      sensorGroup: a.integer(),
      sensorNumber: a.integer(),
      time: a.datetime(),
      value: a.float(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
