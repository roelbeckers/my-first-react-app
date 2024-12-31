const { BedrockClient, ListFoundationModelsCommand } = require("@aws-sdk/client-bedrock");

async function testBedrock() {
    try {
        const client = new BedrockClient({ 
            region: "ap-southeast-2"
        });
        
        console.log("Client created successfully");
        
        // Test the connection
        const command = new ListFoundationModelsCommand({});
        const response = await client.send(command);
        
        console.log("Response:", JSON.stringify(response, null, 2));
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            code: error.code,
            name: error.name,
            stack: error.stack
        });
    }
}

testBedrock();
