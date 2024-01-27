export { makeGridAreasResizable }

function makeGridAreasResizable(container, elements, config={}) {

    if(config.thickness == null) config.thickness = "15px"
    if(config.minWidth == null) config.minWidth = 0
    if(config.minHeight == null) config.minHeight = 0

    const containerComputedStyle = getComputedStyle(container)
    const gap = containerComputedStyle.gap ?? "0px"
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
            if(position[0] == "x" && (edge < 0 || edge > numColumns-1)){
                console.warn(`Horizontal internal edge ${edge} does not exist in the grid, skipping it`)
                continue;
            }
            if(position[0] == "y" && (edge < 0 || edge > numRows-1)){
                console.warn(`Vertical internal edge ${edge} does not exist in the grid, skipping it`)
                continue;
            }
            
            axis[position[0]](container, placements[position](createHelper(gridAreaElement, config), gap, config), edge, config)
        }
    }
}

function xResizable(gridElement, helper, rowIndexToEdit, config) {

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

        let previousWidth = Math.min(Math.max((clientX - xFactor), config.minWidth), wFactor - config.minWidth)
        rowWidths[rowIndexToEdit] = previousWidth;
        rowWidths[rowIndexToEdit + 1] = Math.max(wFactor - previousWidth, 0);
        let newRowsValue = rowWidths.map(x => x+ "fr").join(' ');

        gridElement.style.gridTemplateColumns = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function yResizable(gridElement, helper, rowIndexToEdit, config) {

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
        let previousHeight = Math.min(Math.max((clientY - yFactor), config.minHeight), hFactor - config.minHeight)
        colHeights[rowIndexToEdit] = previousHeight;
        colHeights[rowIndexToEdit + 1] = Math.max(hFactor - previousHeight, 0);
        let newRowsValue = colHeights.map(x => x + "fr").join(' ');

        gridElement.style.gridTemplateRows = newRowsValue;
    }

    gridElement.addEventListener("mousedown", mouseDown)

}

function createHelper(element, config) {
    element.style.position = "relative"
    let div = document.createElement("div")

    if(config.debugBackgroundColor != null){
        div.style.backgroundColor = config.debugBackgroundColor
    }
    
    div.style.zIndex = 1
    div.style.position = "absolute"
    element.appendChild(div)
    return div
}

function xMinusPlacement(div, gap, config) {
    
    if(config.thickness == "auto"){
        div.style.width = gap
        div.style.transform = "translateX(-100%)"
    }
    else{
        if(!/\d/.test(gap)) gap = "0px";

        div.style.width = config.thickness
        div.style.transform = `translateX(calc(-50% - ${gap} / 2))`
    }

    div.style.height = "100%"
    div.style.cursor = "ew-resize"

    return div
}

function xPlusPlacement(div, gap, config) {

    if(config.thickness == "auto"){
        div.style.width = gap
        div.style.transform = "translateX(100%)"
    }
    else{
        if(!/\d/.test(gap)) gap = "0px";

        div.style.width = config.thickness
        div.style.transform = `translateX(calc(50% + ${gap} / 2))`
    }

    div.style.right = "0"
    div.style.height = "100%"
    div.style.cursor = "ew-resize"
    return div
}

function yPlusPlacement(div, gap, config) {

    if(config.thickness == "auto"){
        div.style.height = gap
        div.style.transform = "translateY(100%)"
    }
    else{
        if(!/\d/.test(gap)) gap = "0px";

        div.style.height = config.thickness
        div.style.transform = `translateY(calc(50% + ${gap} / 2))`
    }


    div.style.bottom = "0"
    div.style.width = "100%"
    div.style.cursor = "ns-resize"
    return div
}

function yMinusPlacement(div, gap, config) {

    if(config.thickness == "auto"){
        div.style.height = gap
        div.style.transform = "translateY(-100%)"
    }
    else{
        if(!/\d/.test(gap)) gap = "0px";

        div.style.height = config.thickness
        div.style.transform = `translateY(calc(-50% - ${gap} / 2))`
    }

    div.style.width = "100%"
    div.style.cursor = "ns-resize"
    return div
}
