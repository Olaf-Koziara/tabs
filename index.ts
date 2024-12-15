interface tab {
    title: string,
    content: string
}

interface tabsConfiguration {
    containerSelector: string,
    tabs: tab[],
    firstActive?: boolean,
    onTabChange?: (activeTabIndex?: number) => any
}

interface tabElement {
    navItem: HTMLLIElement,
    content: HTMLDivElement
}

const createTabs = ({containerSelector, tabs, firstActive = false, onTabChange}: tabsConfiguration) => {
    let activeTabIndex: number | null = firstActive ? 0 : null;
    const tabsContainer = document.querySelector(containerSelector);
    if (tabsContainer) {
        tabsContainer.classList.add('tabs');
        const tabsNav = document.createElement('ul');
        tabsNav.classList.add('tabs__nav');
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
            if (targetIndex !== activeTabIndex) {
                if (activeTabIndex !== null) {
                    toggleActiveClass(false, tabsElements[activeTabIndex])
                }
                toggleActiveClass(true, tabsElements[targetIndex])
                activeTabIndex = targetIndex;
                onTabChange && onTabChange(activeTabIndex)
            }
        }
        return {setActiveTabByIndex, activeTabIndex}
    }
    return null;

}
const toggleActiveClass = (active: boolean, tabElement: tabElement) => {
    tabElement.navItem.classList.toggle('active', active);
    tabElement.content.classList.toggle('active', active);
}
