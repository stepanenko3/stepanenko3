// index.js
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Mustache from 'mustache';
import fetch from 'node-fetch';
import fs from 'fs';
const MUSTACHE_MAIN_DIR = './main.mustache';

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/

function getRefreshDate() {
    let DATA = {
        me: {
            first_name: 'Artem',
            last_name: 'Stepanenko',
            username: 'stepanenko3',
            startWorkingYear: 2016,
            buymeacoffee: 'stepanenko',
        },

        readmeUpdatedInfo: true,
        badgeStyle: 'flat',

        skills: [
            {
                key: 'PHP',
                color: '777BB4',
                logo: 'php',
            },
            {
                key: 'Laravel',
                color: 'FF2D20',
                logo: 'laravel',
            },
            {
                key: 'JavaScript',
                color: 'F7DF1E',
                logo: 'javascript',
            },
            {
                key: 'Vue.js',
                color: '777BB4',
                logo: 'vue.js',
            },
            {
                key: 'MacOS',
                color: '000000',
                logo: 'apple',
            },
            {
                key: 'Docker',
                color: '46a2f1',
                logo: 'docker',
            },
            {
                key: 'Visual_Studio_Code',
                color: '0078D4',
                logo: 'visual-studio-code',
            },
            {
                key: 'MySQL',
                color: '4479A1',
                logo: 'mysql',
            },
            {
                key: 'PostgreSQL',
                color: '316192',
                logo: 'postgresql',
            },
            {
                key: 'JSON',
                color: '0000',
                logo: 'json',
            },
            {
                key: 'Git',
                color: 'F05032',
                logo: 'git',
            },
            {
                key: 'Redis',
                color: 'DC382D',
                logo: 'redis',
            },
            {
                key: 'ElasticSearch',
                color: '005571',
                logo: 'elasticsearch',
            },
            {
                key: 'HTML5',
                color: 'E34F26',
                logo: 'html5',
            },
            {
                key: 'CSS3',
                color: '1572B6',
                logo: 'css3',
            },
            {
                key: 'TypeScript',
                color: '007ACC',
                logo: 'typescript',
            },
            {
                key: 'SASS',
                color: 'CC6699',
                logo: 'sass',
            },
            {
                key: 'Markdown',
                color: '000000',
                logo: 'markdown',
            },
            {
                key: 'Angular',
                color: 'E23237',
                logo: 'angular',
            },
            {
                key: 'Tailwind_CSS',
                color: '38B2AC',
                logo: 'tailwindcss',
            },
            {
                key: 'jQuery',
                color: '0769AD',
                logo: 'jquery',
            },
            {
                key: 'Json_Web_Tokens',
                color: '323330',
                logo: 'json-web-tokens',
                logoColor: 'pink',
            },
            {
                key: 'Editor_Config',
                color: '000',
                logo: 'editorconfig',
            },
            {
                key: 'Jira',
                color: '0052CC',
                logo: 'jira',
            },
            {
                key: 'Notion',
                color: '000',
                logo: 'notion',
            },
            {
                key: 'Trello',
                color: '0052CC',
                logo: 'trello',
            },
            {
                key: 'GitLab',
                color: '330F63',
                logo: 'gitlab',
            },
            {
                key: 'GitHub',
                color: '100000',
                logo: 'github',
            },
            {
                key: 'Figma',
                color: 'F24E1E',
                logo: 'figma',
            },
            {
                key: 'Webpack',
                color: '8DD6F9',
                logo: 'webpack',
            },
            {
                key: 'NPM',
                color: 'CB3837',
                logo: 'npm',
            },
        ],

        novaPackages: [
            {
                name: 'Nova Health',
                key: 'nova-health',
                manager: 'packagist',
            },
            {
                name: 'Nova Cards',
                key: 'nova-cards',
                manager: 'packagist',
            },
            {
                name: 'Nova Settings',
                key: 'nova-settings',
                manager: 'packagist',
            },
            {
                name: 'Nova Markdown',
                key: 'nova-markdown',
                manager: 'packagist',
            },
            {
                name: 'Nova Menu Collapsed',
                key: 'nova-menu-collapsed',
                manager: 'packagist',
            },
            {
                name: 'Nova Command Runner',
                key: 'nova-command-runner',
                manager: 'packagist',
            },
            {
                name: 'Nova Filemanager',
                key: 'nova-filemanager',
                manager: 'packagist',
            },
            {
                name: 'Nova Image Tags',
                key: 'nova-image-tags',
                manager: 'packagist',
            },
            {
                name: 'Nova Logs Tool',
                key: 'nova-logs-tool',
                manager: 'packagist',
            },
            {
                name: 'Nova JSON',
                key: 'nova-json',
                manager: 'packagist',
            },
        ],

        laravelPackages: [
            {
                name: 'Laravel Log Viewer',
                key: 'laravel-log-viewer',
                manager: 'packagist',
            },
            {
                name: 'Laravel Pagination',
                key: 'laravel-pagination',
                manager: 'packagist',
            },
            {
                name: 'Laravel Runtime Config',
                key: 'laravel-runtime-config',
                manager: 'packagist',
            },
            {
                name: 'Laravel System Resources',
                key: 'laravel-system-resources',
                manager: 'packagist',
            },
        ],

        otherPackages: [
            {
                name: 'Vue3 Nestable',
                key: 'vue3-nestable',
                manager: 'npm',
            },
            {
                name: 'Composer Versions Check',
                key: 'composer-versions-check',
                manager: 'packagist',
            },
        ],

        date: new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'Europe/Kiev',
        }),
    };

    DATA.package = function () {
        return {
            npm: this.key,
            packagist: `${DATA.me.username}/${this.key}`,
        }[this.manager];
    };

    return DATA;
}

async function getWeatherInformation() {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
    )
        .then(r => r.json())
        .then(r => {
            let refreshDate = getRefreshDate();
            let data = {
                ...refreshDate,
            };

            if (r.main) {
                data.city = r.name;
                data.city_temp = Math.round(r.main.temp);
                data.city_temp_feels_like = Math.round(r.main.feels_like);
                data.city_weather = r.weather[0].description;
                data.city_weather_icon = r.weather[0].icon;
                data.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Kiev',
                });
                data.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Kiev',
                });
            }

            return data;
        });
}

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
async function generateReadMe(data) {
    await fs.readFile(MUSTACHE_MAIN_DIR, (err, content) => {
        if (err) throw err;
        const output = Mustache.render(content.toString(), data);
        fs.writeFileSync('README.md', output);
    });
}

async function action() {

    /**
     * Fetches Weather and Generates README
     */
    await getWeatherInformation().then(generateReadMe);
}

action();
