export type Product = { id: number; name: string; price: number; tag: string; blurb: string }

export const catalog: Product[] = [
  { id: 1, name: "Resumable Kettle", price: 39, tag: "kitchen", blurb: "Boils without waking any JavaScript." },
  { id: 2, name: "Island Lamp", price: 59, tag: "home", blurb: "Lights up only the part you touch." },
  { id: 3, name: "Slot Shelf", price: 89, tag: "home", blurb: "Named and scoped places for everything." },
  { id: 4, name: "Edge Mug", price: 14, tag: "kitchen", blurb: "Served from the edge, hot." },
  { id: 5, name: "Stream Rug", price: 120, tag: "home", blurb: "Streams in from the top of the room." },
]
