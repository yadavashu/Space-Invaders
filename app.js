document.addEventListener('DOMContentLoaded',() =>{
  const squares=document.querySelectorAll('.grid div')
  const sdisplay=document.querySelector('input')

  let width=15
  let cShooterIndex=202
  let cInvaderIndex=0
  let alienTakenDown=[]
  let result=0
  let direction=1
  let invaderId 

  const Invaders=[
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
  ]

  Invaders.forEach( invades => squares[invades + cInvaderIndex].classList.add('invader') )

  squares[cShooterIndex].classList.add('shooter')

  function  moveShooter(e){
    squares[cShooterIndex].classList.remove('shooter')
    switch (e.keyCode){
      case 37:
        if(cShooterIndex % width !==0 )cShooterIndex -=1
        break
        case 39:
          if(cShooterIndex % width < width-1)cShooterIndex+=1
          break
    }
    squares[cShooterIndex].classList.add('shooter')
  }
document.addEventListener('keydown',moveShooter)


function moveInvaders()
{
  const ledge=Invaders[0] % width === 0
  const redge=Invaders[Invaders.length -1] % width === width-1

  if((ledge && direction === -1) || (redge && direction ===1))
  {
    direction=width
  }
  else if(direction === width)
  {
    if(ledge)direction=1
    else direction=-1
  }

    for(let i=0;i<Invaders.length;i++)
    squares[Invaders[i]].classList.remove('invader')

    for(let i=0;i<Invaders.length;i++)
    Invaders[i] +=direction

    for(let i=0;i<Invaders.length;i++)
    {
      if(!alienTakenDown.includes(i))
      {
        squares[Invaders[i]].classList.add('invader')
      }
      else{console.log(i)}
    }


    if(squares[cShooterIndex].classList.contains('invader','shooter'))
    {
      alert('Game Over')
      clearInterval(invaderId)
    }

    if(alienTakenDown.length===Invaders.length)
    {
      alert('You Win')
      clearInterval(invaderId)
    }
}
invaderId=setInterval(moveInvaders,500)

function shoot(e)
{
    let laserId
    let cLaserIndex = cShooterIndex
    function moveLaser() {
  squares[cLaserIndex].classList.remove('laser')
      cLaserIndex -= width
     
      squares[cLaserIndex].classList.add('laser')
      if(squares[cLaserIndex].classList.contains('invader')) {
        squares[cLaserIndex].classList.remove('laser')
        squares[cLaserIndex].classList.remove('invader')
        squares[cLaserIndex].classList.add('boom')

        setTimeout(() => squares[cLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

        const TakenDown = Invaders.indexOf(cLaserIndex)
        console.log(TakenDown)
        alienTakenDown.push(TakenDown)
        result++
        sdisplay.value = result
      }

      if(cLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[cLaserIndex].classList.remove('laser'), 100)
      }
    }

    switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break
    }
  }

document.addEventListener('keyup', shoot)

})