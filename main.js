export { makeGridAreasResizable }

function makeGridAreasResizable(container, elements) {

    const containerComputedStyle = getComputedStyle(container)
    const thickness = containerComputedStyle.gap
    const numColumns = containerComputedStyle.gridTemplateColumns.split(' ').length
    const numRows = containerComputedStyle.gridTemplateRows.split(' ').length

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
        for (let { position, edge } of element.helpers) {
            if(position[0] == "x" && (edge <= -1 || edge >= numColumns-1)){
                console.warn(`Horizontal internal edge ${edge} does not exist in the grid, skipping it`)
                continue;
            }
            if(position[0] == "y" && (edge <= -1 || edge >= numRows-1)){
                console.warn(`Vertical internal edge ${edge} does not exist in the grid, skipping it`)
                continue;
            }
            
            axis[position[0]](container, placements[position](createHelper(gridAreaElement), thickness), edge)
        }
    }
}

function xResizable(gridElement, helper, rowIndexToEdit) {

    let rowWidths = null

    let xFactor = 0
    let wFactor = 0

    let oldUserSelect = null

    function mouseDown(e) {
        const {clientX} = e
        if (helper.contains(e.target)) {

            oldUserSelect = gridElement.style.userSelect 
            gridElement.style.userSelect = "none"

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
        gridElement.style.userSelect = oldUserSelect
    }

    function mouseMove(e) {
        const { clientX } = e

        let previousWidth = Math.min(Math.max((clientX - xFactor), 0), wFactor)
        rowWidths[rowIndexToEdit] = previousWidth;
        rowWidths[rowIndexToEdit + 1] = Math.max(wFactor - previousWidth, 0);
        let newRowsValue = rowWidths.map(x => x+ "fr").join(' ');

        gridElement.style.gridTemplateColumns = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function yResizable(gridElement, helper, rowIndexToEdit) {

    let colHeights = null

    let yFactor = 0
    let hFactor = 0

    let oldUserSelect = null

    function mouseDown(e) {
        const { clientY } = e
        if (helper.contains(e.target)) {

            oldUserSelect = gridElement.style.userSelect 
            gridElement.style.userSelect = "none"

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

        gridElement.style.userSelect = oldUserSelect
    }

    function mouseMove(e) {
        const { clientY } = e
        let previousHeight = Math.min(Math.max((clientY - yFactor), 0), hFactor)
        colHeights[rowIndexToEdit] = previousHeight;
        colHeights[rowIndexToEdit + 1] = Math.max(hFactor - previousHeight, 0);
        let newRowsValue = colHeights.map(x => x + "fr").join(' ');

        gridElement.style.gridTemplateRows = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function createHelper(element) {
    element.style.position = "relative"
    let div = document.createElement("div")
    //div.style.backgroundColor = "red"
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
