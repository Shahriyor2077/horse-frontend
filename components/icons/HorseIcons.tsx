interface IconProps {
    className?: string;
}

export function HorseHeadIcon({ className }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 512 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M416 32c-17.7 0-32 14.3-32 32v32h-32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v16c0 8.8-7.2 16-16 16H224c-17.7 0-32 14.3-32 32v16H96c-35.3 0-64 28.7-64 64v48c0 26.5 21.5 48 48 48h16v80c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32v-80h64v80c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V336h16c26.5 0 48-21.5 48-48V192c0-8.8 7.2-16 16-16h16c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H416zM128 336a16 16 0 1 1 0-32 16 16 0 0 1 0 32z" />
        </svg>
    );
}

export function HorseshoeIcon({ className }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 512 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M256 32C132.3 32 32 132.3 32 256c0 56.1 20.5 107.4 54.2 146.7L64 448h80l24-40c26.6 14.8 57.1 24 89.7 24h-1.7c32.6 0 63.1-9.2 89.7-24L370 448h80l-22.2-45.3C461.5 363.4 480 311.1 480 256 480 132.3 379.7 32 256 32zm0 64c88.4 0 160 71.6 160 160 0 40.5-15.1 77.5-39.8 105.5l-8.2 9.5H144l-8.2-9.5C111.1 333.5 96 296.5 96 256c0-88.4 71.6-160 160-160zm-80 96a48 48 0 0 0-48 48 48 48 0 0 0 48 48 48 48 0 0 0 48-48 48 48 0 0 0-48-48zm160 0a48 48 0 0 0-48 48 48 48 0 0 0 48 48 48 48 0 0 0 48-48 48 48 0 0 0-48-48z" />
        </svg>
    );
}
