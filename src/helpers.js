const helpers = {
    formatNumber: (number) => {
        number = parseFloat(number).toFixed(2);
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return number;
    }
}

export default helpers;