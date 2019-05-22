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

-- example with animation, you can drop the subscription part when not using animations

type alias Model =
    { tabState : Tab.State }


init : ( Model, Cmd Msg )
init =
  ( { tabState = Tab.initialState}, Cmd.none )


type Msg
    = TabMsg Tab.State


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        TabMsg state ->
            ( { model | tabState = state }
            , Cmd.none
            )

view : Model -> Html Msg
view model =
        div []
            [ CDN.stylesheet
            , tab model
            ]

tab : Model -> Html Msg
tab model =
    Tab.config TabMsg
        |> Tab.withAnimation -- remember to wire up subscriptions when using this option
        -- |> Tab.left
        |> Tab.items
            [ Tab.item
                { id = "tabItem1"
                , link = Tab.link [] [ text "Node" ]
                , pane = Tab.pane [] [ text "Tab 1 Content" ]
                }
            , Tab.item
                  { id = "tabItem2"
                  , link = Tab.link [] [ text "Edge" ]
                  , pane = Tab.pane [] [ text "Tab 1 Content" ]
                  }
            , Tab.item
                  { id = "tabItem3"
                  , link = Tab.link [] [ text "Graph" ]
                  , pane = Tab.pane [] [ text "Tab 1 Content" ]
                  }
            , Tab.item
                { id = "tabItem4"
                , link = Tab.link [] [ text "Layout" ]
                , pane = Tab.pane [] [ text "Tab 2 Content" ]
                }
            ]
        |> Tab.view model.tabState


subscriptions : Model -> Sub Msg
subscriptions model =
    Tab.subscriptions model.tabState TabMsg

main : Program () Model Msg
main =
    Browser.element
        { view = view
        , update = update
        , subscriptions = subscriptions
        , init = \() -> init
        }
