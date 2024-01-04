import { binding, GeoPoint } from 'baqend';

declare module 'baqend' {

    interface baqend {
        Message: binding.EntityFactory<model.Message>;
    }

    namespace model {
        interface Device extends binding.Entity {
            deviceOs: string;
        }

        interface Role extends binding.Entity {
            name: string;
            users: Set<User>;
        }

        interface User extends binding.Entity {
            username: string;
            inactive: boolean;
        }

        interface Message extends binding.Entity {
            name: string;
            text: string;
            face: string;
        }

        interface Page extends binding.Entity {
            name: string;
            href: string;
            headlinePrimary: string;
            headlineSecondary: string;
            content: string;
            position: number;
            published: boolean;
            homepage: boolean;
        }
        
        interface Skill extends binding.Entity {
            name: string;
            shortName: string;
        }

        interface MainActivity extends binding.Entity {
            name: string;
        }

        interface Company extends binding.Entity {
            name: string;
            city: string;
        }

        interface WorkExperience extends binding.Entity {
            duration: string;
            title: string;
            mainActivities: Array<MainActivity>;
            company: Company;
        }

        export interface SocialLink extends binding.Entity {
            href: string;
            title: string;
            faName: string;
            position: number;
            published: boolean;
        }

    }
}