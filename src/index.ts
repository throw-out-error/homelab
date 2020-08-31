import { writeFileSync } from "fs";
import inquirer from "inquirer";
import { createComposeFile } from "./create";

inquirer
    .prompt([
        {
            type: "checkbox",
            message: "Select services to deploy",
            name: "services",
            choices: [
                new inquirer.Separator(" = The Grafana Stack = "),
                {
                    name: "Grafana",
                },
                {
                    name: "InfluxDB",
                },
                new inquirer.Separator(" = === ="),
            ],
            validate: function (answer) {
                if (answer.length < 1)
                    return "You must choose at least one service.";

                return true;
            },
        },
    ])
    .then(({ services }: { services: string[] }) => {
        // Use user feedback
        createComposeFile(services).then((contents) =>
            writeFileSync("docker-compose.yml", contents, {
                encoding: "utf-8",
            }),
        );
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
            console.error(error);
        }
    });
