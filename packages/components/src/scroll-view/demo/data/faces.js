const faces =
  '😀😁🤣😂😄😅😆😇😉😊' +
  '🙂🙃😋😌😍😘😙😜😝🤑' +
  '🤓😎🤗🤡🤠😏😶😑🤔😳' +
  '😞😠😡😔😕😣😖😫😤' +
  '😮😱😨😰😯😦😢😥😪😓' +
  '🤤😭😲🤥🤢🤧🤐🤕😴😈'

export default function randomFace(len) {
  const facesList = Array.from(faces)
  const index = parseInt(Math.random() * (facesList.length - len))
  return facesList.slice(index, index + len).join('')
}
