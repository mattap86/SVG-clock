function localTime() {
    let date = new date()
    let seconds = date.getSeconds()
    let minutes = date.getMinutes()
    let hour = date.getHours()

    var hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    for(let i = 0; i < hands.length; i++) {
        let elements = document.querySelectorAll('.' + hands[i].hand)
        for (let j = 0; j < elements.length; j++) {
            elements[j].style.transform = 'rotate('+ hands[i].angle + 'deg)'
            if (hands[i].hand === 'minutes') {
                elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle)
            }
        }
    }
}

function setUpMinutesHand() {
    let minuteHand = document.getElementById('#minuteHand')
    let secondAngle = minuteHand[0].getAttribute("data-second-angle")
    if (secondAngle > 0) {
        let delay = (((360 - secondAngle) / 6) + 0.1) * 1000
        setTimeout(function() {
            moveMinuteHands(minuteHand)
        }, delay)
    }
}

function moveMinuteHands(containers) {
    for (let k = 0; k < containers.length; k++) {
        containers[k].style.transform = 'rotate(6deg)'
    }
    setInterval(function() {
        for (let k = 0; k < containers.length; k++) {
            if (containers[k].angle === undefined) {
                containers[k].angle = 12
            } else {
                containers[k].angle += 6
            }
            containers[k].style.transform = 'rotate('+ containers[k].angle + 'deg)'
        }
    }, 60000)
}

function moveSecondHand() {
    let secondHand = document.getElementById('#secondHand')
    setInterval(function() {
        for (let i = 0; i < secondHand.length; i++) {
            if (secondHand[i].angle === undefined) {
                secondHand[i].angle = 6
            } else {
                secondHand[i].angle += 6
            }
            secondHand[i].style.transform = 'rotate('+ secondHand[i].angle + 'deg)'
        }
    }, 1000)
}