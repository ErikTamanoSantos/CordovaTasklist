/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#button-add").click(function() {
        if ($("#input-text").val().trim() != "") {
            $("ul").append(`
                <li>
                    <a>
                        <div class="task">
                            <label>${$("#input-text").val()}</label>
                            <button class="delete-button"></button>
                        </div>
                    </a>
                </li>`);
            $("ul").listview("refresh");

            $("li").off().on("click", function(event) {
                if (event.target.className !== "delete-button") {
                    let label = $(this).children().children().find("label");
                    $("#edit-task").val(label.text());
                    $("#back-button").off().on("click", function() {
                        label.text($("#edit-task").val())
                        window.location.replace("http://localhost:8000/index.html#")
                    })
                    window.location.replace("http://localhost:8000/index.html#pageEdit");
                }
            });

            $(".delete-button").off().on("click", function() {
                $(this).parent().parent().get(0).remove()
            })
        }
    })
}
