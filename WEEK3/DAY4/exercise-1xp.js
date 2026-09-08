// ==========================================
// #1
// ==========================================

function funcOne() {
    let a = 5;

    if (a > 1) {
        a = 3;
    }

    console.log(`inside the funcOne function ${a}`);
}

funcOne();

// Answer: a = 3
// Because a starts at 5, and 5 > 1, so a becomes 3.

// If we use const instead of let:
// const a = 5;
// a = 3;
// This gives an ERROR because const cannot be changed.



// ==========================================
// #2
// ==========================================

{
    let a = 0;

    function funcTwo() {
        a = 5;
    }

    function funcThree() {
        console.log(`inside the funcThree function ${a}`);
    }

    // First: a = 0
    funcThree();

    // Change a to 5
    funcTwo();

    // Now: a = 5
    funcThree();

    // Answer:
    // First alert: inside the funcThree function 0
    // Second alert: inside the funcThree function 5

    // If we use const instead of let:
    // const a = 0;
    // a = 5;
    // This gives an ERROR because const cannot be changed.
}



// ==========================================
// #3
// ==========================================

function funcFour() {
    globalThis.a = "hello";
}

function funcFive() {
    console.log(`inside the funcFive function ${globalThis.a}`);
}

funcFour();
funcFive();

// Answer: a = "hello"
// funcFour() creates globalThis.a and gives it the value "hello".
// funcFive() then reads that value.



// ==========================================
// #4
// ==========================================

{
    let a = 1;

    function funcSix() {
        let a = "test";

        console.log(`inside the funcSix function ${a}`);
    }

    funcSix();

    // Answer: a = "test"
    // The a inside funcSix() is used because it is
    // the variable closest to where a is being used.

    // If we use const instead of let:
    // const a = "test";
    // The result is still "test".
    // There is no error because we are not changing a.
}



// ==========================================
// #5
// ==========================================

{
    let a = 2;

    if (true) {
        let a = 5;

        console.log(`in the if block ${a}`);
    }

    console.log(`outside of the if block ${a}`);

    // Answer:
    // Inside the if block: a = 5
    // Outside the if block: a = 2

    // This happens because let has block scope.
    // The a = 5 only exists inside the { } of the if.

    // If we use const instead of let:
    // const a = 2;
    //
    // if (true) {
    //     const a = 5;
    // }
    //
    // The result is still:
    // Inside the if block: 5
    // Outside the if block: 2
}
