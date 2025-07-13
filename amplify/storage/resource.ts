import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifySensorReadingDrive",
  access: (allow) => (
    {
      "media/{entity_id}/*": [
        allow.entity("identity").to(["read", "write", "delete"]),
      ],
    }
  ),
});
