interface tab {
    title: string,
    content: string
}

type navigationPosition = 'start' | 'center' | 'end';

interface tabsConfiguration {
    containerSelector: string,
    tabs: tab[],
    firstActive?: boolean,
    onTabChange?: (activeTabIndex?: number) => any
    navigationPosition?: navigationPosition
}

interface tabElement {
    navItem: HTMLLIElement,
    content: HTMLDivElement
}

const createTabs = ({
                        containerSelector,
                        navigationPosition = 'start',
                        tabs,
                        firstActive = true,
                        onTabChange
                    }: tabsConfiguration) => {
    let activeTabIndex: number | null = firstActive ? 0 : null;
    const tabsContainer = document.querySelector(containerSelector);
    if (tabsContainer) {
        tabsContainer.classList.add('tabs');
        const tabsNav = document.createElement('ul');
        tabsNav.classList.add('tabs__nav');
        tabsNav.classList.add(`justify-${navigationPosition}`)
        const tabsContent = document.createElement('div');
        tabsContent.classList.add('tabs__content');

        const tabsElements = tabs.map((tab, index): tabElement => {
            const tabNavItem = document.createElement('li');
            const tabNavItemButton = document.createElement('button');
            tabNavItemButton.innerText = tab.title;
            const tabContent = document.createElement('div');
            tabContent.innerHTML = tab.content;
            tabNavItemButton.addEventListener('click', () => setActiveTabByIndex(index))
            tabNavItem.appendChild(tabNavItemButton);
            tabsNav.appendChild(tabNavItem);
            tabsContent.appendChild(tabContent);
            return {navItem: tabNavItem, content: tabContent};
        })
        tabsContainer.appendChild(tabsNav)
        tabsContainer.appendChild(tabsContent)

        const setActiveTabByIndex = (targetIndex: number) => {
            if (targetIndex !== activeTabIndex || activeTabIndex === 0) {
                if (activeTabIndex !== null) {
                    toggleActiveClass(false, tabsElements[activeTabIndex])
                }
                toggleActiveClass(true, tabsElements[targetIndex])
                activeTabIndex = targetIndex;
                onTabChange && onTabChange(activeTabIndex)
            }
        }
        activeTabIndex !== null && setActiveTabByIndex(activeTabIndex);
        return {setActiveTabByIndex}
    }
    return null;

}
const toggleActiveClass = (active: boolean, tabElement: tabElement) => {
    tabElement.navItem.classList.toggle('active', active);
    tabElement.content.classList.toggle('active', active);
}
