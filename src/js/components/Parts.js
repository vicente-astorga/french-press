
export default function Parts(partsMotion) {
    const partsInfo = [
      {title: "Cover", text: "The Cover helps maintain the temperature of the brew that is prepared. It is usually made of metal or plastic."},
      {title: "Filter", text: "The filter lets you strain the finished brew from the coffee or tea. To filter the finished brew, shift the filter down without removing the cap."},
      {title: "Glass", text: "Most French presses have glass decanters, although ceramic and metal types are also available"},
      {title: "Support", text: "To provide convenient access to the glass and filter screen for cleaning, the support is completely removable."},
    ]
    const $parts = document.querySelectorAll(".parts__box__item > span");
    const $title = document.querySelector(".parts__info__title");
    const $text = document.querySelector(".parts__info__text");

    $parts.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        partsMotion[index]()
        $title.textContent = partsInfo[index].title
        $text.textContent = partsInfo[index].text
      });
    });
}