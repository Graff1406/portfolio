<template>
  <v-card flat>
    <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
    <v-card-title primary-title class="d-flex justify-center pt-5">
      {{ $t.customComponent[$route.params.name].title }}
    </v-card-title>
    <v-card-text>
      {{ $t.customComponent[$route.params.name].text }}
      <h3 class="subtitle-2 py-2">
        {{ `${$t.customComponent[$route.params.name].subtext}:` }}
      </h3>
      <div 
        v-for="item in $t.customComponent[$route.params.name].points"
        :key="item"
        class="ml-3"
      >
        {{ `- ${item}` }}
      </div>
      <p class="d-flex justify-end mt-3 mb-0">HTML</p>
      <v-card outlined color="grey lighten-3" height="350">
        <v-card-text class="pa-0">
          <div class="scroll"><pre>
            {{ code[$route.params.name].s_html }}
          </pre>
          </div>
          
        </v-card-text>
      </v-card>
      <p class="d-flex justify-end mt-3 mb-0">JS</p>
      <v-card outlined color="grey lighten-3" height="350">
        <v-card-text class="pa-0">
          <div class="scroll"><pre>
            {{ code[$route.params.name].s_js }}
          </pre>
          </div>         
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'CustomComponent',
  data() {
    return {
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: `${this.$route.params.name[0].toUpperCase()}${this.$route.params.name.slice(1)}`,
          disabled: true,
        }
      ],
      code: {
        dialog: {
          s_html: `
            <template>
              <v-autocomplete
                ref="search"
                v-model="model"
                :items="search.items"
                :loading="loading"
                :label="$t('search.label.search')"
                :no-data-text="$t('search.noDataText')"
                :append-icon="$device.isMobile ? '' : 'search'"
                flat
                clearable
                hide-details
                hide-selected
                class="pa-0 ma-0"
                solo
                @keypress="startSearch"
              >
              </v-autocomplete>
            </template>
          `,
          s_js: `
            import { mapState, mapMutations } from 'vuex'
            import searchQuery from '../../../mixins/searchQuery'
            export default {
              name: 'MySearchInput',
              mixins: [searchQuery],
              props: {
                searchFocus: {
                  type: Boolean,
                  default: false
                },
                searchClickEnter: {
                  type: Boolean,
                  default: false
                }
              },
              data() {
                return {
                  model: null,
                  loading: false
                }
              },
              computed: {
                ...mapState(['search', 'hostName'])
              },
              watch: {
                model(val) {
                  this.SET({ prop: 'search.searchInput', data: val })
                },
                searchFocus(val) {
                  if (val) {
                    this.$refs.search.onClick()
                    this.$emit('update:searchFocus', !val)
                  }
                }
              },
              created() {
                this.model = this.search.searchInput
              },
              methods: {
                async startSearch(e) {
                  try {
                    if (e.code === 'Enter') {
                      // if field is empty prevent events
                      if (!e.target.value.length) return
                      // check cookie, have or not new searching key
                      const parsed = JSON.parse(localStorage.getItem('searchHistpry'))
                      // prevent form NULL
                      if (parsed) {
                        if (!parsed.includes(e.target.value)) {
                          // if havn't add to cookie "searchHistpry"
                          parsed.unshift(e.target.value)
                          localStorage.setItem('searchHistpry', JSON.stringify(parsed))
                        }
                      } else {
                        // if wasn't created cookie "searchHistpry"
                        // create and add first value
                        localStorage.setItem(
                          'searchHistpry',
                          JSON.stringify([e.target.value])
                        )
                      }
                      if (!this.search.searchInput) {
                        // if search input is empty, then call list of professions
                        this.$refs.search.onClick()
                      } else if (!this.search.cityInput) {
                        // if search input is full, then change focus to city field
                        this.$emit('update:searchClickEnter', true)
                        // after focus in city firld have to prevet to show list of professions
                        this.$refs.search.blur()
                      } else {
                        // after click in search firld have to prevet to show list of professions
                        this.$refs.search.blur()
                        // pass to "profiles" page with query
                        this.query()
                      }
                    } else if (
                      // send request after typing 2 character.
                      // first 2 character will be send to server as data.
                      // prevent calling event if key down "Backspace"
                      //  becouse if was type more than 2 character and after
                      // key down "Backspace" need to prevent send request
                      e.target.value.length === 2 &&
                      e.code !== 'Backspace' &&
                      !this.search.searchKeys.includes(e.target.value)
                    ) {
                      this.loading = !this.loading
                      this.SET({ prop: 'search.searchKeys', data: e.target.value })
                      const server = await this.$axios.get(
                        '/php/user/search/index.php',
                        {
                          params: {
                            profession: e.target.value
                          }
                        }
                      )
                      this.loading = !this.loading
                      if (server.data) {
                        // if data from server no empty
                        // add eny value to search items
                        for (const item of server.data) {
                          if (
                            !this.search.items.includes(item.profession) ||
                            !this.search.items.includes(item.service)
                          ) {
                            this.search.items.push(item.profession)
                            this.search.items.push(item.service)
                          }
                        }
                      }
                    }
                  } catch (error) {
                    alert(error)
                  }
                },
                ...mapMutations(['SET'])
              },
              mounted() {
                try {
                  const parsed = JSON.parse(localStorage.getItem('searchHistpry'))
                  if (parsed)
                    parsed.forEach(item => this.SET({ prop: 'search.items', data: item }))
                } catch (error) {
                  alert(error)
                }
              }
            }
          `
        },
        notification: {
          s_html: `
            <template>
              <span>
                <v-btn color="success" icon @click="setModel">
                  <v-badge v-if="notifications.entity" color="warning" overlap>
                    <template v-slot:badge>
                      {{ notifications.entity }}
                    </template>
                    <v-icon>notifications</v-icon>
                  </v-badge>
                  <v-icon v-else>notifications</v-icon>
                </v-btn>
                <my-dialog
                  v-model="model"
                  :device="$device"
                  :title="$t('common.notification')"
                >
                  <template v-slot:card-text>
                    <v-list two-line>
                      <v-list-item-group multiple>
                        <template v-for="(item, index) in notifications.items">
                          <v-list-item
                            :key="notifications-1"
                            :class="{ 'pink lighten-5': !item.readed }"
                            @click="readNotices(index)"
                          >
                            <v-list-item-content>
                              <v-list-item-title
                                :class="{ 'pink--text': !item.readed }"
                                v-text="item.title"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                class="text--primary"
                                v-text="item.created"
                              ></v-list-item-subtitle>
                              <v-list-item-subtitle
                                v-if="!moreSubTitle[index]"
                                class="text--primary"
                                v-text="item.text"
                              ></v-list-item-subtitle>
                              <p v-else class="body-2 grey--text text--darken-1 ma-0">
                                {{ item.text }}
                              </p>
                            </v-list-item-content>
                          </v-list-item>

                          <v-divider
                            v-if="index + 1 < notifications.items.length"
                            :key="index"
                          ></v-divider>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </template>
                </my-dialog>
              </span>
            </template>
          `,
          s_js: `
            import MyDialog from '../Dialog/Index'
            export default {
              name: 'MyNotification',
              components: {
                MyDialog
              },
              props: {
                // getting all notifications from API
                notices: {
                  type: Array,
                  required: true
                },
                // save in database that notie was readed
                endpintTouchNotie: {
                  type: String,
                  required: true
                }
              },
              data() {
                return {
                  model: false,
                  moreSubTitle: []
                }
              },
              computed: {
                notifications() {
                  // filter message if wasn't reded will be go to top 
                  const noReadedNoties = this.notices.filter((note, i, arr) => {
                    if (!note.readed) {
                      arr.splice(i, 1)
                      return note
                    }
                  })
                  const noties = []
                  for (const item of noReadedNoties) {
                    noties.push(item)
                  }
                  for (const item of this.notices) {
                    noties.push(item)
                  }
                  return {
                    items: noties,
                    entity: noReadedNoties.length
                  }
                }
              },
              methods: {
                async readNotices(i) {
                // will be store in database that was readed 
                  this.$set(this.moreSubTitle, i, !this.moreSubTitle[i])
                  if (!this.notifications.items[i].readed) {
                    const server = await this.$axios.post(
                      this.endpintTouchNotie,
                      { id: this.notifications.items[i].id },
                      { withCredentials: true }
                    )
                  }
                },
                setModel() {
                  this.model = !this.model
                  this.hideBadge = false
                }
              }
            }
          `
        },
      }
    }
  }
}
</script>
<style scoped>
  .scroll {
      overflow-y: scroll;
      height: 350px;
    }
</style>