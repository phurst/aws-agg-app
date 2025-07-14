import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Input,
  Flex,
  Label,
  View,
  Image,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [sensorReadings, setSensorReadings] = useState([]);

  useEffect(() => {
    fetchSensorReadings();
  }, []);

  async function fetchSensorReadings() {
    const { data: sensorReadings } = await client.models.SensorReading.list();
    await Promise.all(
      sensorReadings.map(async (sensorReading) => {
        // if (note.image) {
        //   const linkToStorageFile = await getUrl({
        //     path: ({ identityId }) => `media/${identityId}/${note.image}`,
        //   });
        //   console.log(linkToStorageFile.url);
        //   note.image = linkToStorageFile.url;
        // }
        return sensorReading;
      })
    );
    console.log(sensorReadings);
    setSensorReadings(sensorReadings);
  }

  async function createSensorReading(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log("Form:");
    console.log(form.forEach((value, key, parent) => {
      console.log(key, value);
    }));

    const { data: newSensorReading } = await client.models.SensorReading.create({
      sensorGroup: Number.parseInt(form.get("sensorGroup")),
      sensorNumber: Number.parseInt(form.get("sensorNumber")),
      value: Number.parseFloat(form.get("value")),
      time: new Date().toISOString(),
    });

    console.log(newSensorReading);

    fetchSensorReadings();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const toBeDeletedNote = {
      id: id,
    };

    const { data: deletedNote } = await client.models.Note.delete(
      toBeDeletedNote
    );
    console.log(deletedNote);

    fetchNotes();
  }

  async function deleteSensorReading({ id }) {
    const toBeDeletedSensorReading = {
      id: id,
    };

    const { data: deletedSensorReading } = await client.models.SensorReading.delete(
      toBeDeletedSensorReading
    );
    console.log(deletedSensorReading);

    fetchSensorReadings();
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >

          <Heading level={1}>Sensor Readings App</Heading>
          <View as="form" margin="0.2rem 0" onSubmit={createSensorReading}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="1rem"
              padding="0.2rem"
            >
              <Flex
                direction="column"
                justifyContent="center"
                gap="0rem"
                padding="0rem"
              >
                <Label htmlFor="Default">Sensor Group</Label>
                <Input
                  type="number"
                  name="sensorGroup"
                  placeholder="Sensor Group"
                  label="Sensor Group"

                  // variation="quiet"
                  required
                />
              </Flex>
              <Flex
                direction="column"
                justifyContent="center"
                gap="0rem"
                padding="0rem"
              >
                <Label htmlFor="Default">Sensor Number</Label>
                <Input
                  type="number"
                  name="sensorNumber"
                  placeholder="Sensor Number"
                  label="Sensor Number"
                  // variation="quiet"
                  required
                />
              </Flex>
              <Flex
                direction="column"
                justifyContent="center"
                gap="0rem"
                padding="0rem"
              >
                <Label htmlFor="Default">Value</Label>
                <Input
                  type="number"
                  name="value"
                  placeholder="Value"
                  label="Sensor Number"
                  // variation="quiet"
                  required
                />
              </Flex>

              <Button type="submit" variation="primary">
                Add Sensor Reading
              </Button>
            </Flex>
          </View>

          <Divider />
          <Heading level={2}>Current Sensor Readings</Heading>
          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {sensorReadings.map((sensorReading) => (
              <Flex
                key={sensorReading.id || sensorReading.sensorNumber}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level="3">{sensorReading.sensorNumber}</Heading>
                </View>
                <Text fontStyle="italic">{sensorReading.sensorGroup}</Text>
                <Text fontStyle="italic">{sensorReading.sensorNumber}</Text>
                <Text fontStyle="italic">{sensorReading.time}</Text>
                <Text fontStyle="italic">{sensorReading.value}</Text>
                <Button
                  variation="destructive"
                  onClick={() => deleteSensorReading(note)}
                >
                  Delete Sensor Reading
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator>
  );
}
