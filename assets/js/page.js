(() => {
    const formatTimestamp = (date) => {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            return null;
        }

        const dateFormatter = new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        });

        const timeFormatter = new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${dateFormatter.format(date)} ? ${timeFormatter.format(date)}`;
    };

    const enhancePageTitle = () => {
        const titleNode = document.querySelector('[data-page-title]');
        if (!titleNode) return;

        const existing = titleNode.textContent?.trim();
        if (!existing) {
            titleNode.textContent = document.title;
        }
    };

    const enhanceTimestamp = () => {
        const container = document.querySelector('[data-page-timestamp]');
        if (!container) return;

        const parsed = new Date(document.lastModified);
        const formatted = formatTimestamp(parsed);

        if (!formatted) {
            container.setAttribute('aria-hidden', 'true');
            container.classList.add('is-hidden');
            return;
        }

        let timeNode = container.querySelector('time');
        if (!timeNode) {
            timeNode = document.createElement('time');
            container.append(timeNode);
        }

        timeNode.dateTime = parsed.toISOString();
        timeNode.textContent = formatted;
    };

    const hydrateCurrentYear = () => {
        const year = new Date().getFullYear().toString();
        const targets = document.querySelectorAll('[data-current-year], #current-year');
        targets.forEach((node) => {
            node.textContent = year;
        });
    };

    const ready = () => {
        enhancePageTitle();
        enhanceTimestamp();
        hydrateCurrentYear();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }
})();
