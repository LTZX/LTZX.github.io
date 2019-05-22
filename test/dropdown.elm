module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Bootstrap.CDN as CDN
import Bootstrap.Navbar as Navbar
import Bootstrap.Grid as Grid
import Bootstrap.Button as Button
import Bootstrap.Tab as Tab
import Bootstrap.Dropdown as Dropdown

-- Model
type alias Model =
    { myDrop1State : Dropdown.State
    ,content : String
    }

-- Msg
type Msg
    = MyDrop1Msg Dropdown.State
    |Item1Msg
    |Item2Msg

-- init
init : (Model, Cmd Msg )
init =
    ( { myDrop1State = Dropdown.initialState,content = "main"}, Cmd.none
    )

-- update
update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        MyDrop1Msg state ->
            ( { model | myDrop1State = state }
            , Cmd.none
            )
        Item1Msg ->
            ({ model | content = "close"} , Cmd.none)
        Item2Msg ->
            ({ model | content = "close"} , Cmd.none)

        -- ... and cases for the drop down actions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Dropdown.subscriptions model.myDrop1State MyDrop1Msg
        ]


view : Model -> Html Msg
view model =
    div []
        [ CDN.stylesheet
        , dropdown model
        ]


dropdown: Model -> Html Msg
dropdown model=
      div []
          [
          Dropdown.dropdown
              model.myDrop1State
              { options = [ Dropdown.alignMenuRight ]
              , toggleMsg = MyDrop1Msg
              , toggleButton =
                  Dropdown.toggle [ Button.warning ] [ text "Level" ]
              , items =
                  [ Dropdown.buttonItem [ onClick Item1Msg ] [ text "Level" ]
                  , Dropdown.buttonItem [ onClick Item2Msg ] [ text "Number of People" ]
                  , Dropdown.buttonItem [ onClick Item2Msg ] [ text "Volume of Interaction" ]
                  , Dropdown.buttonItem [ onClick Item2Msg ] [ text "None" ]
                  ]
              }

          -- etc
          ]



main : Program () Model Msg
main =
    Browser.element
        { view = view
        , update = update
        , subscriptions = subscriptions
        , init = \() -> init
        }
