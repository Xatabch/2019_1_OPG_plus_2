export class StringBlock {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    getCordinates(): any {
        const width = 5;
        const height = 5;
        const intValue: number = +this.value;

        if (intValue < width * height - 1) {
            return {
                x: Math.floor(intValue % width),
                y: Math.floor(intValue / height)
            }
        }

        return {
            x: -1,
            y: -1
        }
    }
}