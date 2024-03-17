<script async setup>
import axios from "axios";

const discordId = 146348630926819328;
const lanyardUrl = `https://api.lanyard.rest/v1/users/${discordId}`;

// Async router GET request to the Lanyard API
const response = await axios.get(lanyardUrl);

// If the request fails, log the error
const lanyardError = response.error;

// Parse this into an object
const lanyardData = response.data;
</script>
