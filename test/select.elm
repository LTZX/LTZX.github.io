import Html exposing (..)
import Html.Attributes exposing (..)
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.Select as Select
import Bootstrap.Form.Checkbox as Checkbox
import Bootstrap.Form.Radio as Radio
import Bootstrap.Form.Textarea as Textarea
import Bootstrap.Form.Fieldset as Fieldset
import Bootstrap.Button as Button

main : Program () Model Msg
main =
    Browser.element
        { view = view
        , update = update
        , subscriptions = subscriptions
        , init = \() -> init
        }




view :List (Option msg) -> List (Item msg) -> Html Msg
view model =
        div []
            [ CDN.stylesheet,
             Form.form[][ Form.label [ for "myselect" ] [ text "My select" ]
            , Select.select [ Select.id "myselect" ]
            [ Select.item [] [ text "Item 1"]
            , Select.item [] [ text "Item 2"]
            ]
        ]
             ]
-- select: List (Option msg) -> List (Item msg) -> Html msg
-- Select.select
--     [ Select.id "myselect"
--     , Select.onChange MySelectMsg
--     ]
--     [ Select.item [ value "1" ] [ text "Item 1" ]
--     , Select.item [ value "2" ] [ text "Item 2" ]
--     ]
