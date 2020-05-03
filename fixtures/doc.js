export const doc = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Hello ProseMirror" }]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is editable text. You can focus it and start typing."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "To apply styling, you can select a piece of text and manipulate its styling from the menu. The basic schema supports "
        },
        { type: "text", marks: [{ type: "em" }], text: "emphasis" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "strong" }], text: "strong text" },
        { type: "text", text: ", " },
        {
          type: "text",
          marks: [
            { type: "link", attrs: { href: "somewhere.com", title: "" } }
          ],
          text: "links"
        },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "code font" },
        { type: "text", text: ", and images." },
        { type: "text", text: "Also " },
        { type: "text", marks: [{ type: "redaction" }], text: "redactions" },
        { type: "text", text: "." }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Block-level structure can be manipulated with key bindings (try ctrl-shift-2 to create a level 2 heading, or enter in an empty textblock to exit the parent block), or through the menu."
        }
      ]
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "Try using the “list” item in the menu to wrap this paragraph in a numbered list."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const freeWrite = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "My dog is distracting. " },
        { type: "text", marks: [{ type: "em" }], text: "Be my muse" },
        {
          type: "text",
          text:
            ". If you go years without thinking of anything to write, maybe you aren’t a writer. Maybe you just like typing. By you I mean me. I always mean me."
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text:
            "Why can I never write anything that isn’t just me moping about not being inspired?"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "After I make a few style fixes here, I am going to pour myself a glass of whiskey and see if that can get some juices flowing."
        }
      ]
    },
    { type: "horizontal_rule" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Sitting vigil is very uncomfortable. I think that’s an appropriate term for the past month or so since my dad came home from the hospital. Things had been progressing badly, and this time we found out there were now "
        },
        { type: "text", marks: [{ type: "em" }], text: "innumerable " },
        {
          type: "text",
          text:
            "metastases in his brain. I thought he would die within a couple weeks. He has gotten weaker. The caregiver—Vince—is no longer moving him to a wheelchair to sit in front of the TV in the family room all day. He remains in bed now. He is very easily irritated, making it difficult to be around him some times."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "I don’t want to write about this, though. Not right now. Maybe not ever."
        }
      ]
    },
    { type: "horizontal_rule" },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Raincoat Acoustics" }]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Rain feels important. That is something he knew he had to get across. The sound of a good pour. The rain needs to be hitting a good surface, of course. A galvanized steel(?) roof is sublime. The hood of a rain coat. An acoustic amphitheater for an audience of one. "
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "A sweatshirt in the rain is less than ideal. It does not sound good. It gets very wet. It then gets heavy. And cold."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The bass of some good rumbling thunder is almost arousing."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Good rain is temperature dependent. Cold rain is no fun. The cold dampens even the sound, even if only because you know it is cold."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "The shaking house provokes. There is nothing like it—maybe war, I suppose."
        }
      ]
    },
    { type: "horizontal_rule" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Well that was weird, I guess. I think I was trying too hard at times to stick to a voice that maybe was too forced. I’d rather write more with the voice that comes naturally. Maybe that voice has nothing interesting to say."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "I feel bad for my dog a lot. He must be bored. I want to go cozy up with him for a few minutes. I wonder if I’ll make it back."
        }
      ]
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "— (shit like this should just work (make a <hr />)"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "l really need to set up a server for this thing like asap. I don’t want to be losing "
        },
        { type: "text", marks: [{ type: "em" }], text: "the" },
        {
          type: "text",
          text:
            " things. I guess the right way to do it would be to use this editor as the package that it is. Spin "
        },
        { type: "text", marks: [{ type: "em" }], text: "up" },
        { type: "text", text: " a CMS that uses it" }
      ]
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "/`probably-dumb-work-idea` Merge field visualizer (for gathering context about what the fields are referring to)"
        }
      ]
    },
    { type: "paragraph", content: [{ type: "save" }] },
    {
      type: "paragraph",
      content: [
        { type: "text", marks: [{ type: "strong" }], text: "Editor ideas" }
      ]
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "slash commands like that 👆that just fuzzy search auto complete so nicely"
                }
              ]
            }
          ]
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "markdown as a first class citizen (except only the parts I use 🙃), working in the same way that a dash works now to become a bullet list item"
                }
              ]
            }
          ]
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "copy paste ought to just work" }]
            }
          ]
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "command + d to select the same word elsewhere, which means multi-cursor must be happening"
                }
              ]
            },
            { type: "paragraph" }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "How do these save commands look in the middle of a "
        },
        { type: "save" },
        {
          type: "text",
          text:
            "sentence. A little distracting. But I think they usually won’t come in the middle of sentences—they’ll come more often after a sentence."
        },
        { type: "save" }
      ]
    },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" }
  ]
};
