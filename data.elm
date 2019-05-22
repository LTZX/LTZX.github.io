import Json.Decode as Decode exposing (Decoder, int, string, float)
import Json.Decode.Pipeline exposing (required, optional, hardcoded)

type alias Nodes =
  { name : String
  , group : Int
  , value : Int
  }

type alias Links =
  { source : Int
  , target : Int
  , weight : Int
  }

nodesDecoder : Decoder Nodes
nodesDecoder =
  Decode.succeed Nodes
    |> required "name" string
    |> required "group" int
    |> required "value" int

linksDecoder : Decoder Links
linksDecoder =
  Decode.succeed Links
    |> reuqired "source" int
    |> required "target" int
    |> required "weight" int



Json.Decode.decodeString
  nodesDecoder
  """
    {"name":"FB","group":0,"value":1}
  """
