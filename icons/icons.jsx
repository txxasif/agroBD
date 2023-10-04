export function EmailSvg(props) {
    return (
        <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    )
}
export function TakaSvg(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="16.5" cy="15.5" r="1" />
            <path d="M7 7a2 2 0 1 1 4 0v9a3 3 0 0 0 6 0v-.5" />
            <path d="M8 11h6" />
        </svg>
    )
}
export function QuantitySvg(props) {
    return (
        <svg  {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket">
            <path d="m5 11 4-7" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
            <path d="m9 11 1 9" />
            <path d="M4.5 15.5h15" />
            <path d="m15 11-1 9" />
        </svg>
    )
}