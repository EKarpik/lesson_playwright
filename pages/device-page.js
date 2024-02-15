const BasePage = require("./base-page");

class DevicePage extends BasePage {
    //все полезные локаторы со страницы устройств здесь
    constructor(page) {
        super(page);
        this._tabAll = page.locator("[data-value = 'all']")
        this._tabFavorite = page.locator("[data-value = 'favorites']")
        this._searchInput = page.getByRole("textbox", {name: "Поиск"})
        this._anyDeviceName = page.locator("[data-qa = 'Text']")

        //const divText = page.getByText("Автозаводская 27  (п. 1)")
    }

    //поиск устройства
    async fillSearchInput(device_Name) {
        await this._searchInput.fill(device_Name);
        //await this._anyDeviceName.toBeVisible()
    };


}

module.exports = DevicePage;
