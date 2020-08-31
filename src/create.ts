export const createComposeFile = async (services: string[]) => {
    return `version: "3"
services:${services
        .map((s) => {
            const name = s.toLowerCase();
            let ports: string[] = [];
            let image = "";
            switch (name) {
                case "grafana":
                    image = "grafana/grafana";
                    ports.push("8085:3000");
                    break;
                case "influxdb":
                    image = "influxdb";
                    ports.push("8086:8086");
                    break;
            }

            return `
    ${name}:
        image: "${image}"
        env_file: .env
        ports:
            ${ports.map((p) => `- ${p}`)}
        `;
        })
        .join("")}`;
};
