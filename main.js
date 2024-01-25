export { makeGridAreasResizable }
function makeGridAreasResizable(container, elements) {
    let thickness = getComputedStyle(container).gap
    const placements = {
        "x-": xMinusPlacement,
        "x+": xPlusPlacement,
        "y-": yMinusPlacement,
        "y+": yPlusPlacement,
    }
    const axis = {
        "x": xResizable,
        "y": yResizable
    }
    for (const element of elements) {
        const gridAreaElement = container.querySelector(element.query)
        for (const { position, area } of element.helpers) {
            axis[position[0]](container, placements[position](createHelper(gridAreaElement), thickness), area)
        }
    }
}

function xResizable(gridElement, helper, rowIndexToEdit) {

    let width = null
    let rowWidths = null

    let xFactor = 0
    let wFactor = 0

    function mouseDown(e) {
        const {clientX} = e
        if (helper.contains(e.target)) {

            width = Number(getComputedStyle(gridElement).width.replace("px", ""))
            rowWidths = getComputedStyle(gridElement).gridTemplateColumns.split(' ').map(x => Number(x.replace("px", "")))

            gridElement.addEventListener("mousemove", mouseMove)
            gridElement.addEventListener("mouseup", mouseUp)

            let sw = rowWidths[rowIndexToEdit]
            wFactor = rowWidths[rowIndexToEdit + 1] + sw
            xFactor = clientX - sw
        }
    }
    function mouseUp(e) {
        gridElement.removeEventListener("mousemove", mouseMove)
        gridElement.removeEventListener("mouseUp", mouseUp)
    }
    function mouseMove(e) {
        const { clientX } = e

        let previousWidth = Math.max((clientX - xFactor), 0)
        rowWidths[rowIndexToEdit] = previousWidth;
        rowWidths[rowIndexToEdit + 1] = wFactor - previousWidth;
        let newRowsValue = rowWidths.map(x => x+ "fr").join(' ');

        gridElement.style.gridTemplateColumns = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function yResizable(gridElement, helper, rowIndexToEdit) {

    let height = null
    let colHeights = null

    let yFactor = 0
    let hFactor = 0

    function mouseDown(e) {
        const { clientY } = e
        if (helper.contains(e.target)) {

            height = Number(getComputedStyle(gridElement).height.replace("px", ""))
            colHeights = getComputedStyle(gridElement).gridTemplateRows.split(' ').map(x => Number(x.replace("px", "")))

            gridElement.addEventListener("mousemove", mouseMove)
            gridElement.addEventListener("mouseup", mouseUp)

            let sw = colHeights[rowIndexToEdit]
            hFactor = colHeights[rowIndexToEdit + 1] + sw
            yFactor = clientY - sw
        }
    }
    function mouseUp(e) {
        gridElement.removeEventListener("mousemove", mouseMove)
        gridElement.removeEventListener("mouseUp", mouseUp)
    }
    function mouseMove(e) {
        const { clientY } = e

        let previousHeight = Math.max((clientY - yFactor), 0)
        colHeights[rowIndexToEdit] = previousHeight;
        colHeights[rowIndexToEdit + 1] = hFactor - previousHeight;
        let newRowsValue = colHeights.map(x => x + "fr").join(' ');

        gridElement.style.gridTemplateRows = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function createHelper(element, thickness) {
    element.style.position = "relative"
    let div = document.createElement("div")
    div.style.userSelect = "none"
    // div.style.backgroundColor = "red"
    div.style.position = "absolute"
    element.appendChild(div)
    return div
}

function xMinusPlacement(div, thickness) {
    div.style.width = thickness
    div.style.height = "100%"
    div.style.transform = "translateX(-100%)"
    div.style.cursor = "ew-resize"
    return div
}
function xPlusPlacement(div, thickness) {
    div.style.right = "0"
    div.style.width = thickness
    div.style.height = "100%"
    div.style.transform = "translateX(100%)"
    div.style.cursor = "ew-resize"
    return div
}
function yPlusPlacement(div, thickness) {
    div.style.bottom = "0"
    div.style.width = "100%"
    div.style.height = thickness
    div.style.transform = "translateY(100%)"
    div.style.cursor = "ns-resize"
    return div
}
function yMinusPlacement(div, thickness) {
    div.style.width = "100%"
    div.style.height = thickness
    div.style.transform = "translateY(-100%)"
    div.style.cursor = "ns-resize"
    return div
}
